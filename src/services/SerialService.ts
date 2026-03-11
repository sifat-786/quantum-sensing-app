export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export type StatusListener = (status: ConnectionStatus) => void;

class SerialService {
  private status: ConnectionStatus = 'disconnected';
  private listeners: Set<StatusListener> = new Set();
  
  public getStatus(): ConnectionStatus {
    return this.status;
  }

  public addListener(listener: StatusListener) {
    this.listeners.add(listener);
  }

  public removeListener(listener: StatusListener) {
    this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.status));
  }

  public connect() {
    if (this.status !== 'disconnected') return;

    this.status = 'connecting';
    this.notifyListeners();

    // Simulate connection delay
    setTimeout(() => {
      this.status = 'connected';
      this.notifyListeners();
      console.log('[SerialService] Connected');
    }, 1500);
  }

  public disconnect() {
    if (this.status === 'disconnected') return;
    
    this.status = 'disconnected';
    this.notifyListeners();
    console.log('[SerialService] Disconnected');
  }

  public sendCommand(cmd: string) {
    if (this.status !== 'connected') {
      console.warn('[SerialService] Cannot send command, not connected. CMD:', cmd);
      return;
    }
    console.log('[SerialService] Sent string ->', cmd);
  }
}

export const serialService = new SerialService();
