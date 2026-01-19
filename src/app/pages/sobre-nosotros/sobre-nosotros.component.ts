import { Component } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
  linkedin?: string;
}


@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css'
})
export class SobreNosotrosComponent {

  team: TeamMember[] = [
    {
      name: 'Ezequiel  Prilusky',
      role: 'Data Scientist',
      linkedin: 'https://www.linkedin.com/in/ezequiel-samuel-prilusky-g-728679341?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    },
    {
      name: 'Ganna Kharkovska',
      role: 'Data Engineer',
      linkedin: 'https://www.linkedin.com/in/anna-ganna-kharkovskaya/'
    },
    {
      name: 'Alexander Tovar',
      role: 'Data Scientist',
      linkedin: 'https://www.linkedin.com/in/alexander-tovar-morcillo/'
    },
    {
      name: 'Rafael Osuna',
      role: 'Data Scientist',
      linkedin: 'https://www.linkedin.com/in/rafaelosuna16'
    },
    {
      name: 'Javier Menéndez',
      role: 'Data Scientist',
      linkedin: 'https://www.linkedin.com/in/javier-men%C3%A9ndez-mateos-0523ba346/'

    },
    {
      name: 'Julio Chaverra',
      role: 'Backend Developer',
      linkedin: 'https://www.linkedin.com/in/juliochaverra/'
    },
    {
      name: 'Alison Paz',
      role: 'Backend Developer',
      linkedin: 'https://www.linkedin.com/in/alison-paz-silva-301126365/'
    },
    {
      name: 'Fabian Guerrero',
      role: 'Backend Developer',
      linkedin: 'https://www.linkedin.com/in/fabian-guerrero-b39b0b24b/'
    },
    {
      name: 'Alonso Higa',
      role: 'Backend Developer',
      linkedin: 'https://www.linkedin.com/in/alonso-enrique-higa-kohatsu-0302b6347'
    },
    {
      name: 'Jaime Valle',
      role: 'Backend Developer',
      linkedin: 'https://www.linkedin.com/in/jaime-valle-6341782b8'
    }
  ];
}
