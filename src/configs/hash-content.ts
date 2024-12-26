import { EVehicleType } from 'src/types/parking-lots.type';

export const hashVehicleType: { [key in EVehicleType]: string } = {
  [EVehicleType.BICYCLE]: 'Xe đạp',
  [EVehicleType.CAR]: 'Ô tô',
  [EVehicleType.MOTORCYCLE]: 'Xe máy',
};
