import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { DishModule } from './dish/dish.module';
import { CategoryModule } from './category/category.module';
import { GoodModule } from './good/good.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { B2Module } from './b2/b2.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ToppingsModule } from './toppings/toppings.module';
import { OptionModule } from './option/option.module';
import { CustomerDishModule } from './customer-dish/customer-dish.module';
import { OrderItemModule } from './order-item/order-item.module';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      context: ({ req, res }) => ({ req, res }),
      plugins: [
        // Install a landing page plugin based on NODE_ENV
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              graphRef: 'my-graph-id@my-graph-variant',
              footer: false,
            })
          : ApolloServerPluginLandingPageLocalDefault({
              footer: true,
              includeCookies: true,
            }),
      ],
      autoSchemaFile: join(
        process.cwd(),
        'src/@generated/schema.gql',
      ),
    }),
    PrismaModule,
    UserModule,
    AuthenticationModule,
    DishModule,
    CategoryModule,
    GoodModule,
    RestaurantModule,
    OrderModule,
    B2Module,
    IngredientModule,
    ToppingsModule,
    OptionModule,
    CustomerDishModule,
    OrderItemModule,
  ],
})
export class AppModule {}
