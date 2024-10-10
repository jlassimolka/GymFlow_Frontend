import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/Fitnessgym.png"
          class="align-middle m-2"
          alt="logo"
          style="width: 180px; height: auto;"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
