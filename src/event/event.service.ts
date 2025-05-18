import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Event } from 'src/database/models/event.entity';
import { User } from 'src/database/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {

    constructor(
        @Inject('EVENT_REPOSITORY')
        private readonly eventRepository: Repository<Event>,
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>
    ) { }


    async addParticipants(eventId: number, userId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['participants'],
    });
  
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    
    if(event.getParticipant(userId)){
        throw new ConflictException('This participant is already part of the event');
    }

    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
        throw new NotFoundException('User not found');
    }
   
    event.participants.push(user);
  
    return this.eventRepository.save(event);
  }


    async save(event: Event): Promise<Event> {
        return this.eventRepository.save(event)
    }

    async find(eventId: number): Promise<Event|null> {
        return this.eventRepository.findOneBy({id: eventId});
    }

    async getAll(): Promise<Event[]> {
        return this.eventRepository.find();
    }

    async findByLabel(label: string): Promise<Event | null> {
        return this.eventRepository.findOneBy({ label });
    }

    async labelAlreadyUsed(label): Promise<boolean> {
        const event = await this.findByLabel(label);
        return event != null
    }

    async getParticipants(eventId: number) {
        const event = await this.eventRepository.findOne({
          where: { id: eventId },
          relations: ['participants'],
        });
      
        if (!event) {
          throw new NotFoundException('Event not found');
        }
      
        return event.participants;
      }
}
