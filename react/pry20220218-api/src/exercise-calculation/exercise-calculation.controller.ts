import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { BaseController } from 'src/base'
import { ExerciseCalculation } from './exercise-calculation.entity'
import { ExerciseCalculationService } from './exercise-calculation.service'
import { CreateExerciseCalculation } from './dto/register-excersice-calculation.dto'

@Controller('exercise-calculation')
export class ExerciseCalculationController extends BaseController<ExerciseCalculation> {
  constructor (private exerciseCalculationService: ExerciseCalculationService) {
    super(exerciseCalculationService)
  }

  @Post()
  async calculation (@Body() dto: CreateExerciseCalculation) {
    const data = this.exerciseCalculationService.calculation(dto)
    return data
  }

  @Get('player/:playerId')
  async getPlayerHistory (@Param('playerId') playerId: string) {
    const data = this.exerciseCalculationService.getPlayerHistory(playerId)
    return data
  }
}
