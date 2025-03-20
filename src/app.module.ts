import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { VocationalQuestionsModule } from './vocational-questions/vocational-questions.module';
import { VocationalResponsesModule } from './vocational-responses/vocational-responses.module';
import { PsychologicalResponsesModule } from './psychological-responses/psychological-responses.module';
import { MeetsModule } from './meets/meets.module';
import { LikertScalesModule } from './likert-scales/likert-scales.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    VocationalQuestionsModule,
    VocationalResponsesModule,
    PsychologicalResponsesModule,
    MeetsModule,
    LikertScalesModule,
    EventsModule,
  ],
  providers: [JwtAuthGuard],
})
export class AppModule {}
