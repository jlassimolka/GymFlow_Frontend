import { Injectable } from '@angular/core';
import { ManagerManagementService } from './manager-management.service';
import { CoachManagementService } from './coach-management.service';
import { AdherentManagementService } from './adherent-management.service';
import { GymManagementService } from './gym-management.service';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private managerService: ManagerManagementService,
    private coachService: CoachManagementService,
    private adherentService: AdherentManagementService,
    private gymService: GymManagementService
  ) { }

  getCounts(): Observable<{ managers: number, coaches: number, adherents: number, gyms: number }> {
    return forkJoin({
      managers: this.managerService.getAllManager({}).pipe(map(response => response.total)),
      coaches: this.coachService.getAllCoach({}).pipe(map(response => response.total)),
      adherents: this.adherentService.getAllAdherent({}).pipe(map(response => response.total)),
      gyms: this.gymService.getAllGyms({}).pipe(map(response => response.total))
    });
  }
}
