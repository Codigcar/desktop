import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/base'
import { Repository } from 'typeorm'
import { ExerciseCalculation } from './exercise-calculation.entity'
import { CreateExerciseCalculation } from './dto/register-excersice-calculation.dto'
import { PlayerStatisticsService } from 'src/player-statistics/player-statistics.service'
import { PlayerService } from 'src/player/player.service'

@Injectable()
export class ExerciseCalculationService extends BaseService<ExerciseCalculation> {
  constructor (
    @InjectRepository(ExerciseCalculation)
    private exerciseCalculationService: Repository<ExerciseCalculation>,
    private playerStatisticsService: PlayerStatisticsService,
    private playerService: PlayerService,
  ) {
    super(exerciseCalculationService)
  }

  private formula (original: number, request: number) {
    return (request * 100) / original
  }

  //velocidad media, velocidad maxima,sprints
  private sectionA (original: number, request: number) {
    if (original > request) return -100 + this.formula(original, request)
    if (original < request) return -100 + this.formula(original, request)
    if (original === request) return 100 - this.formula(original, request)
    return
  }

  //distancia recorrida, frecuencia cardiaca, tiempo jugado
  private sectionB (original: number, request: number) {
    if (original > request) return 100 - this.formula(original, request)
    if (original < request) return 100 - this.formula(original, request)
    if (original === request) return 100 - this.formula(original, request)
    return 0
  }

  async calculation (data: CreateExerciseCalculation) {
    const found = await this.exerciseCalculationService.findOne({
      where: {
        player: data.player,
      },
    })

    const player = await this.playerService.findOne(data.player)
    const statistics = await this.playerStatisticsService.getAll()
    const playerStatistics = statistics.find(x => x.role === player.role)
    const calculated = {
      average_speed_calculated: this.sectionA(
        playerStatistics.average_speed,
        data.average_speed,
      ),
      maximum_speed_calculated: this.sectionA(
        playerStatistics.maximum_speed,
        data.maximum_speed,
      ),
      sprint_calculated: this.sectionA(playerStatistics.sprint, data.sprint),
      traveled_distance_calculated: this.sectionB(
        playerStatistics.traveled_distance,
        data.traveled_distance,
      ),
      average_heart_rate_calculated: this.sectionB(
        playerStatistics.average_heart_rate,
        data.average_heart_rate,
      ),
      time_played_calculated: this.sectionB(
        playerStatistics.time_played,
        data.time_played,
      ),
    }

    let response = null

    if (found) {
      await this.exerciseCalculationService.update(found._id, {
        ...data,
        ...calculated,
      })

      response = {
        ...data,
        ...calculated,
      }
    } else {
      response = await this.exerciseCalculationService.save({
        ...data,
        ...calculated,
      })
    }

    return response
  }

  async getPlayerHistory (playerId: string) {
    return await this.exerciseCalculationService.findOne({
      where: {
        player: playerId,
      },
    })
  }
}
