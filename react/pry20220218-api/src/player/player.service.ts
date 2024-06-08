import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/base'
import { Repository } from 'typeorm'
import { Player } from './player.entity'

@Injectable()
export class PlayerService extends BaseService<Player> {
  constructor (
    @InjectRepository(Player)
    private playerService: Repository<Player>,
  ) {
    super(playerService)
  }
}
