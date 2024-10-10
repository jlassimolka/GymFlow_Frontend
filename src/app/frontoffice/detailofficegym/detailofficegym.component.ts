import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router
import { Adherent } from 'src/app/backoffice/models/Adherent';
import { Coach } from 'src/app/backoffice/models/Coach';
import { Gym } from 'src/app/backoffice/models/Gym';
import { GymManagementService } from 'src/app/backoffice/services/gym-management.service';
import { Reponse } from 'src/app/models/Reponse';

@Component({
  selector: 'app-detailofficegym',
  templateUrl: './detailofficegym.component.html',
  styleUrls: ['./detailofficegym.component.scss']
})
export class DetailofficegymComponent implements OnInit {
  gym: Gym = {} as Gym;
  coaches: Coach[] = [];
  adherents: Adherent[] = [];
  filteredCoaches: Coach[] = [];
  filteredAdherents: Adherent[] = [];
  gymId : string | null = '';
  constructor(
    private route: ActivatedRoute, 
    private gymService: GymManagementService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.gymId = this.route.snapshot.paramMap.get('id');

    if (this.gymId != null ) {
      this.getGymDetails(this.gymId);
    }
  }

  getGymDetails(id: string): void {
    this.gymService.getGymById(id).subscribe({
      next: (response: Reponse<Gym>) => {
        if (response.content) {
          this.gym = response.content;
          // filter details after gym info is set
          this.getAllCoaches();

        } else {
          this.router.navigate(['/404']);
        }
      },
      error: (error) => {
        console.error('Error fetching gym details:', error);
        this.router.navigate(['/back-office/404']);
      }
    });
  }

  getAllCoaches(): void {
    this.gymService.getCoach({gymId : this.gymId}).subscribe({
      next: (response: Reponse<Coach[]>) => {
        if (response.content) {
          this.coaches = response.content;
          // filter coaches after fetching data
        }
      },
      error: (error) => {
        console.error('Error fetching coaches:', error);
      }
    });
  }


}