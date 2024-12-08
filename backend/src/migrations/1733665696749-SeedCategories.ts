import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCategories1733665696749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO categories (name) VALUES
          ('Cakes and sweet pies'),
          ('Meats'),
          ('Poultry'),
          ('Fish and seafood'),
          ('Salads, sauces, and side dishes'),
          ('Soups'),
          ('Pasta'),
          ('Beverages'),
          ('Sweets and desserts'),
          ('Snacks'),
          ('One-pot meals'),
          ('Light'),
          ('Healthy eating');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM categories WHERE name IN (
            'Cakes and sweet pies',
            'Meats',
            'Poultry',
            'Fish and seafood',
            'Salads, sauces, and side dishes',
            'Soups',
            'Pasta',
            'Beverages',
            'Sweets and desserts',
            'Snacks',
            'One-pot meals',
            'Light',
            'Healthy eating'
          );
        `);
  }
}
