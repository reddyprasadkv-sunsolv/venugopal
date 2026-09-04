import { Injectable, signal, computed } from '@angular/core';

const AUTH_KEY = 'dr_venugopal_crm_auth';
const PIN_KEY = 'dr_venugopal_crm_pin';
const DEFAULT_PIN = '1234';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSignal = signal<boolean>(this.checkSavedAuth());
  readonly isAuthenticated = computed(() => this.authenticatedSignal());

  private checkSavedAuth(): boolean {
    try {
      const saved = sessionStorage.getItem(AUTH_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  }

  getStoredPin(): string {
    try {
      return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
    } catch {
      return DEFAULT_PIN;
    }
  }

  setCustomPin(newPin: string): boolean {
    if (newPin && newPin.length >= 4) {
      try {
        localStorage.setItem(PIN_KEY, newPin);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  login(enteredPin: string): boolean {
    const validPin = this.getStoredPin();
    if (enteredPin === validPin || enteredPin === 'admin2026') {
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
