import { Gym } from "./Gym";

export interface ResponseDto {
    page: number;
    size: number;
    gyms: Gym[];
}