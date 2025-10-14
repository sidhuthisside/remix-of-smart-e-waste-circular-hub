import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull(),
});

export const bookings = sqliteTable('bookings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userName: text('user_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  deviceType: text('device_type').notNull(),
  deviceCount: integer('device_count').notNull(),
  preferredDate: text('preferred_date').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

export const pledges = sqliteTable('pledges', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message'),
  createdAt: text('created_at').notNull(),
});

export const statistics = sqliteTable('statistics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ewasteCollectedKg: integer('ewaste_collected_kg').notNull().default(0),
  economicValueInr: integer('economic_value_inr').notNull().default(0),
  co2AvoidedTons: integer('co2_avoided_tons').notNull().default(0),
  updatedAt: text('updated_at').notNull(),
});