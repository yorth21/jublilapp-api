import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { VocationalQuestionsModule } from './vocational-questions/vocational-questions.module';
import { VocationalResponsesModule } from './vocational-responses/vocational-responses.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    VocationalQuestionsModule,
    VocationalResponsesModule,
  ],
  providers: [JwtAuthGuard],
})
export class AppModule {}
