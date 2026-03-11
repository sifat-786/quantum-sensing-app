export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export interface TelemetryData {
  timestamp?: number;
  cap: number;
  res: number;
  imp: number;
  freq: number;
}

export type StatusListener = (status: ConnectionStatus) => void;
export type DataListener = (data: TelemetryData) => void;

class SerialService {
  private status: ConnectionStatus = 'disconnected';
  private statusListeners: Set<StatusListener> = new Set();
  private dataListeners: Set<DataListener> = new Set();
  
  // Simulation State
  private telemetryInterval: ReturnType<typeof setInterval> | null = null;
  private isRunning: boolean = false;
  private isSweeping: boolean = false;
  private currentFreq: number = 25000;
  private sessionLog: TelemetryData[] = [];
  
  public getStatus(): ConnectionStatus {
    return this.status;
  }

  public getSessionLog(): TelemetryData[] {
    return this.sessionLog;
  }

  public addListener(listener: StatusListener) {
    this.statusListeners.add(listener);
  }

  public removeListener(listener: StatusListener) {
    this.statusListeners.delete(listener);
  }

  public addDataListener(listener: DataListener) {
    this.dataListeners.add(listener);
  }

  public removeDataListener(listener: DataListener) {
    this.dataListeners.delete(listener);
  }

  private notifyStatus() {
    this.statusListeners.forEach(listener => listener(this.status));
  }

  private notifyData(data: TelemetryData) {
    this.dataListeners.forEach(listener => listener(data));
  }

  public connect() {
    if (this.status !== 'disconnected') return;

    this.status = 'connecting';
    this.notifyStatus();

    // Simulate connection delay
    setTimeout(() => {
      this.status = 'connected';
      this.notifyStatus();
      console.log('[SerialService] Connected');
      this.startTelemetryLoop();
    }, 1500);
  }

  public disconnect() {
    if (this.status === 'disconnected') return;
    
    this.status = 'disconnected';
    this.notifyStatus();
    this.stopTelemetryLoop();
    console.log('[SerialService] Disconnected');
  }

  public sendCommand(cmd: string) {
    if (this.status !== 'connected') {
      console.warn('[SerialService] Cannot send command, not connected. CMD:', cmd);
      return;
    }
    console.log('[SerialService] Sent string ->', cmd);
    
    // Parse simulated hardware commands
    if (cmd.startsWith('SET_FREQ:')) {
      const val = parseInt(cmd.replace('SET_FREQ:', ''), 10);
      if (!isNaN(val)) this.currentFreq = val;
    } else if (cmd === 'START') {
      this.isRunning = true;
      this.sessionLog = []; // clear previous log
    } else if (cmd === 'PAUSE' || cmd === 'STOP') {
      this.isRunning = false;
      this.isSweeping = false; // abort sweep if stopped
    } else if (cmd === 'SWEEP_START') {
      this.isSweeping = true;
      this.isRunning = true; // Sweeping implies running
    } else if (cmd === 'SWEEP_STOP') {
      this.isSweeping = false;
    }
  }

  private startTelemetryLoop() {
    if (this.telemetryInterval) clearInterval(this.telemetryInterval);
    
    this.telemetryInterval = setInterval(() => {
      if (this.status === 'connected' && this.isRunning) {
        
        // Handle Auto Sweep Stepping
        if (this.isSweeping) {
          this.currentFreq += 100;
          if (this.currentFreq > 60000) {
            this.currentFreq = 2000; // loop back to bottom of sweep range
          }
        }

        // Generate realistic mock data based on current frequency
        const capBase = 12.0 + (this.currentFreq / 80000) * 2; // base cap
        const capJitter = (Math.random() - 0.5) * 0.4;
        
        const resBase = 24.0 + (this.currentFreq / 40000);
        const resJitter = (Math.random() - 0.5) * 0.2;

        const impBase = 3.0 + (this.currentFreq / 80000);
        const impJitter = (Math.random() - 0.5) * 0.1;

        const data: TelemetryData = {
          timestamp: Date.now(),
          cap: capBase + capJitter,
          res: resBase + resJitter,
          imp: impBase + impJitter,
          freq: this.currentFreq
        };
        
        this.sessionLog.push({...data});
        this.notifyData(data);
      }
    }, 100);
  }

  private stopTelemetryLoop() {
    if (this.telemetryInterval) {
      clearInterval(this.telemetryInterval);
      this.telemetryInterval = null;
    }
  }
}

export const serialService = new SerialService();
