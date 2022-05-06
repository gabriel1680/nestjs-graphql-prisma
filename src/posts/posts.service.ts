import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Post } from '@prisma/client';
import { NewPost, UpdatePost } from 'src/graphql';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async findMany(): Promise<Post[]> {
    return this.prisma.post.findMany({});
  }

  async create(input: NewPost): Promise<Post> {
    return this.prisma.post.create({
      data: input,
    });
  }

  async update(params: UpdatePost): Promise<Post> {
    const { id, published, title, content } = params;
    return this.prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...(published && { published }),
        ...(title && { title }),
        ...(content && { content }),
      },
    });
  }

  async delete(id: string): Promise<Post> {
    return this.prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });
  }
}
