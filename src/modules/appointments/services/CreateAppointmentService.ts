import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

/**
 * Recebimento das informações
 * Tratativa de errros/execessões
 * Acesso ao repositório
 */

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmenetService {
  // Todo service tem apenas um metodo
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findApponintmetInSameDAte = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findApponintmetInSameDAte) {
      throw new AppError('This appointment is alredy booked');
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmenetService;
