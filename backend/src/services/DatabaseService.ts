import { AppDataSource } from '@/config/data-source';
import { Category } from '@/entities/Category';

class DatabaseService {
  public async initializeDatabase(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log('Database initialized.');

      await this.insertInitialData();
    } catch (error) {
      console.error('Error during Data Source initialization:', error);
    }
  }

  private async insertInitialData(): Promise<void> {
    console.log('Inserting initial categories into the database...');
    const categories = [
      { nome: 'Bolos e tortas doces' },
      { nome: 'Carnes' },
      { nome: 'Aves' },
      { nome: 'Peixes e frutos do mar' },
      { nome: 'Saladas, molhos e acompanhamentos' },
      { nome: 'Sopas' },
      { nome: 'Massas' },
      { nome: 'Bebidas' },
      { nome: 'Doces e sobremesas' },
      { nome: 'Lanches' },
      { nome: 'Prato Único' },
      { nome: 'Light' },
      { nome: 'Alimentação Saudável' },
    ];

    for (const category of categories) {
      const cat = new Category();
      cat.nome = category.nome;
      await AppDataSource.manager.save(cat);
    }
    console.log('Inserted initial categories into the database.');

    console.log('Loading categories from the database...');
    const loadedCategories = await AppDataSource.manager.find(Category);
    console.log('Loaded categories: ', loadedCategories);
  }
}

export default new DatabaseService();
