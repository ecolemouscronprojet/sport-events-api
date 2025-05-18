import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateEventDto } from './dto/event.dto';
import { EventService } from './event.service';
import { plainToInstance } from 'class-transformer';
import { Event } from 'src/database/models/event.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { EventRegisterDto } from './dto/event.register';

@Controller('event')
export class EventController {

    constructor(
        private readonly eventService: EventService
    ) { }

    @UseGuards(RolesGuard("organizer"))
    @Post()
    async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
        const event = plainToInstance(Event, createEventDto);

        const labelAlredyExists = await this.eventService.labelAlreadyUsed(event.label);
        if(labelAlredyExists) {
            throw new BadRequestException('Label already used', {
                        cause: new Error(),
                        description: 'This label is already used by another event',
                    });
        }

        return this.eventService.save(event)
    }

    @UseGuards(RolesGuard())
    @Get(':id/participants')
    async getParticipants(@Param('id') id: number) {
    return this.eventService.getParticipants(id);
    }

    @UseGuards(RolesGuard())
    @Get()
    async getAll(): Promise<Event[]> {
        return this.eventService.getAll();
    }

    @UseGuards(RolesGuard("user"))
    @Post('register')
    async register(
        @Req() request: Request,
        @Body() eventRegisterDto: EventRegisterDto
    ): Promise<Event> {
        const user = request['user'];
    
        const event = await this.eventService.addParticipants(eventRegisterDto.eventId, user.id)

        return event;
    }

}
