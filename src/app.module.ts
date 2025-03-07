import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { VocationalTestsModule } from './vocational-tests/vocational-tests.module';
import { VocationalQuestionsModule } from './vocational-questions/vocational-questions.module';
import { VocationalCategoriesModule } from './vocational-categories/vocational-categories.module';
import { VocationalAnswewrsModule } from './vocational-answewrs/vocational-answewrs.module';
import { VocationalResponsesModule } from './vocational-responses/vocational-responses.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    VocationalTestsModule,
    VocationalQuestionsModule,
    VocationalCategoriesModule,
    VocationalAnswewrsModule,
    VocationalResponsesModule,
  ],
  providers: [JwtAuthGuard],
})
export class AppModule {}
