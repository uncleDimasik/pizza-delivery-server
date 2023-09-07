# Pizza Delivery Server

The Pizza Delivery Server is a robust backend system built using Nest.js, Apollo Server, Prisma ORM, PostgreSQL, GraphQL, and GraphQL Codegen. This server is designed to handle the core functionality of a pizza delivery service, including order management, user authentication, and menu management.

## Features:

- **Order Management**: The server efficiently manages incoming pizza orders, including customization, pricing, and order tracking.

- **User Authentication**: Users can create accounts, log in, and securely authenticate themselves for a personalized experience.

- **Menu Management**: Admins can easily update the menu by adding or removing pizzas, toppings, and other items.

- **Real-time Updates**: Leveraging GraphQL subscriptions, the server provides real-time order status updates to users.

- **Data Persistence**: Prisma ORM connects to a PostgreSQL database, ensuring data is stored securely and efficiently.

## Tech Stack:

- **Backend**:
  - Nest.js: A powerful and extensible Node.js framework
  - Apollo Server: A robust GraphQL server implementation
  - Prisma ORM: A modern database toolkit for TypeScript and Node.js
  - PostgreSQL: A scalable and reliable relational database



## Setup:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Configure your PostgreSQL database connection in the Prisma schema.
5. Run Prisma migrations with `npx prisma migrate dev`.
6. Start the server with `npm start`.

## Usage:

1. **User Registration**: Users can create accounts by providing necessary information.

2. **User Authentication**: Registered users can log in securely using their credentials.

3. **Menu Management**: Admins can use the GraphQL API to add, update, or remove items from the menu.

4. **Order Placement**: Users can place orders by customizing their pizzas and specifying delivery details.

5. **Order Tracking**: Users receive real-time order updates via GraphQL subscriptions.

## GraphQL Codegen:

GraphQL Codegen automatically generates TypeScript typings for your GraphQL queries, mutations, and schema. This ensures type safety and improves development efficiency.

To run GraphQL Codegen:

```bash
npm run generate
```

## Future Improvements:

- Implement user roles (admin, customer) for enhanced security and permissions.
- Optimize database queries and schema for high performance.

## Conclusion:

The Pizza Delivery Server, built with Nest.js, Apollo Server, Prisma ORM, and PostgreSQL, provides a solid foundation for a pizza delivery service. Its GraphQL capabilities enable real-time order tracking and efficient menu management. With further enhancements and integrations, it can become a cornerstone of a successful pizza delivery business.