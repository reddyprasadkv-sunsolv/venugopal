import { Injectable, signal, computed } from '@angular/core';

const AUTH_KEY = '__dr_v_sec_tk';
const PIN_HASH_KEY = '__dr_v_phash';

// SHA-256 digests:
// '1234' => 03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4
// 'admin2026' => e9714856b3e6e737039757640243be1be50b92e276077366d210515aa0cfd401
const DEFAULT_PIN_HASH = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4';
const MASTER_PIN_HASH = 'e9714856b3e6e737039757640243be1be50b92e276077366d210515aa0cfd401';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSignal = signal<boolean>(this.checkSavedAuth());
  readonly isAuthenticated = computed(() => this.authenticatedSignal());

  private async sha256(message: string): Promise<string> {
    try {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback simple bitwise hash
      let hash = 0;
      for (let i = 0; i < message.length; i++) {
        hash = ((hash << 5) - hash) + message.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash).toString(16);
    }
  }

  private checkSavedAuth(): boolean {
    try {
      const saved = sessionStorage.getItem(AUTH_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  }

  getStoredPinHash(): string {
    try {
      return localStorage.getItem(PIN_HASH_KEY) || DEFAULT_PIN_HASH;
    } catch {
      return DEFAULT_PIN_HASH;
    }
  }

  async setCustomPin(newPin: string): Promise<boolean> {
    if (newPin && newPin.length >= 4) {
      try {
        const hash = await this.sha256(newPin);
        localStorage.setItem(PIN_HASH_KEY, hash);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  async login(enteredPin: string): Promise<boolean> {
    if (!enteredPin) return false;
    const enteredHash = await this.sha256(enteredPin);
    const validHash = this.getStoredPinHash();

    if (enteredHash === validHash || enteredHash === MASTER_PIN_HASH) {
      this.authenticatedSignal.set(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  }

  logout(): void {
    this.authenticatedSignal.set(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {}
  }
}
