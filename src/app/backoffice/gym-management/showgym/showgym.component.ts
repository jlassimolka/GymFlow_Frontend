import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router
import { GymManagementService } from '../../services/gym-management.service';
import { Gym } from '../../models/Gym';
import { Reponse } from 'src/app/models/Reponse';
import { Adherent } from '../../models/Adherent';
import { Coach } from '../../models/Coach';

@Component({
  selector: 'app-showgym',
  templateUrl: './showgym.component.html',
  styleUrls: ['./showgym.component.scss']
})
export class ShowgymComponent implements OnInit {
  gym: Gym = {} as Gym;
  coaches: Coach[] = [];
  adherents: Adherent[] = [];
  filteredCoaches: Coach[] = [];
  filteredAdherents: Adherent[] = [];
  gymId : string = '';
  constructor(
    private route: ActivatedRoute, 
    private gymService: GymManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gymId = params['id'];
      if (this.gymId != "") {
        this.getGymDetails(this.gymId);
        this.getAllCoaches();
        this.getAllAdherents();
      }
    });
  }

  getGymDetails(id: string): void {
    this.gymService.getGymById(id).subscribe({
      next: (response: Reponse<Gym>) => {
        if (response.content) {
          this.gym = response.content;
          // filter details after gym info is set
          this.filterRelatedDetails(id);
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
    this.gymService.getCoach({}).subscribe({
      next: (response: Reponse<Coach[]>) => {
        if (response.content) {
          this.coaches = response.content;
          // filter coaches after fetching data
          this.filterRelatedDetails(this.gym._id);
        }
      },
      error: (error) => {
        console.error('Error fetching coaches:', error);
      }
    });
  }

  getAllAdherents(): void {
    this.gymService.getAdherent().subscribe({
      next: (response: Reponse<Adherent[]>) => {
        if (response.content) {
          this.adherents = response.content;
          // filter adherents after fetching data
          this.filterRelatedDetails(this.gym._id);
        }
      },
      error: (error) => {
        console.error('Error fetching adherents:', error);
      }
    });
  }

  filterRelatedDetails(gymId: string): void {
    // Update filter logic for coaches
    this.filteredCoaches = this.coaches.filter(coach => coach.gyms?.some(gym => gym._id === gymId));

    // Update filter logic for adherents
    this.filteredAdherents = this.adherents.filter(adherent => adherent.gym === gymId);
  }
}