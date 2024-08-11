import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { isBoolean, toBoolean } from 'src/common/utility/function.utils';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    private s3Service: S3Service,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
    const { Location } = await this.s3Service.uploadFile(image, 'snappfood-image');
    let { title, slug, parentId, show } = createCategoryDto;
    const category = await this.findOneBySlug(slug);
    if (category) throw new ConflictException('already exist category');

    if (isBoolean(show)) show = toBoolean(show);
    await this.categoryRepository.insert({
      title,
      slug,
      show,
      image: Location,
    });

    return {
      message: 'created category successfully',
    };
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async findOneBySlug(slug: string) {
    return await this.categoryRepository.findOneBy({ slug });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
