import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { VocationalTestsModule } from './vocational-tests/vocational-tests.module';

@Module({
  imports: [UsersModule, AuthModule, PostsModule, CommentsModule, VocationalTestsModule],
  providers: [JwtAuthGuard],
})
export class AppModule {}
