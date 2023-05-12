import { ICompanyPerformance } from '../../../interfaces';
import { CarJump } from './CarJump';
import { Disney } from './Disney';
import { GameSys } from './GameSys';
import { Kabam } from './Kabam';
import { King } from './King';
import { PlayStudios } from './PlayStudios';
import { Playtika } from './Playtika';
import { Twitter } from './Twitter';

export const performanceOfCompanies: Readonly<ICompanyPerformance[]> = [
  ...GameSys.map((company) => ({ ...company, company: 'GameSys' })),
  ...Playtika.map((company) => ({ ...company, company: 'Playtika' })),
  ...Disney.map((company) => ({ ...company, company: 'Disney' })),
  ...Twitter.map((company) => ({ ...company, company: 'Twitter' })),
  ...King.map((company) => ({ ...company, company: 'King' })),
  ...Kabam.map((company) => ({ ...company, company: 'Kabam' })),
  ...CarJump.map((company) => ({ ...company, company: 'CarJump' })),
  ...PlayStudios.map((company) => ({ ...company, company: 'PlayStudios' })),
] as const;
