import { PartialType } from '@nestjs/mapped-types';
import { CreateUserWatchlistDto } from './create-user-watchlist.dto';

export class UpdateUserWatchlistDto extends PartialType(CreateUserWatchlistDto) {}
