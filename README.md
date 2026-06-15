# RoomIt Backend

## Overview

RoomIt Backend is a Meeting Room Booking API built using Node.js, Express.js, MongoDB, and Mongoose.

## Features Implemented

### Core Features

* Room Listing API
* Room Availability API
* Create Booking API
* Booking Slot Management
* Booking Cancellation
* Refund Eligibility Logic
* Double Booking Prevention
* Booking Search by Email

### Extra Features (Section 4)

* Buffer Time Between Meetings
* Reschedule Booking
* Refund Window Handling

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

## Installation

```bash
npm install
npm run dev
```

## Seed Data

```bash
roomit-backend-yk2h.onrender.com/api/seed
```

This creates sample rooms.




## Double Booking Prevention

A unique compound index is used on:

```js
roomId + date + slotStart
```

This prevents two users from booking the same slot simultaneously.

## Buffer Time

Every room includes:

```js
bufferMinutes
```

When a booking ends, additional slots are blocked automatically to avoid back-to-back meetings.

## Deployment

Backend deployed on Render.

Backend URL:

https://roomit-backend-yk2h.onrender.com
