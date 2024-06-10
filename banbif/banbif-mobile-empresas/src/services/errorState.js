class ErrorState {
    isLogout = false;

    setIsLogout(bool) {
      this.isLogout = bool;
    }

    getIsLogout() {
        return this.isLogout;
    }
    
}

export const ErrorStateService = new ErrorState()