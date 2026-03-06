import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './car.html',
  styleUrl: './car.css',
})
export class Car {
  inventory = [
    // ... your existing cars ...
    {
      name: 'Tesla Model S',
      year: 2024,
      price: 89990,
      transmission: 'Automatic',
      fuelType: 'Electric',
      imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000',
    },
    {
      name: 'Porsche 911 GT3',
      year: 2023,
      price: 161100,
      transmission: 'PDK',
      fuelType: 'Gasoline',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000',
    },
    {
      name: 'BMW M4 Competition',
      year: 2024,
      price: 78100,
      transmission: 'M Steptronic',
      fuelType: 'Gasoline',
      imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000',
    },
    {
      name: 'Audi RS e-tron GT',
      year: 2024,
      price: 147000,
      transmission: 'Automatic',
      fuelType: 'Electric',
      imageUrl: 'https://images.unsplash.com/photo-1614200024906-13042e841c7e?q=80&w=1000',
    },
    // New Additions Below
    {
      name: 'Aston Martin Vantage',
      year: 2024,
      price: 191000,
      transmission: '8-Speed Auto',
      fuelType: 'Gasoline',
      imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f3ca9fc10ec?q=80&w=1000',
    },
    {
      name: 'Bentley Continental GT',
      year: 2023,
      price: 238500,
      transmission: 'Dual-Clutch',
      fuelType: 'Gasoline',
      imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1000',
    },
    {
      name: 'Maserati MC20',
      year: 2024,
      price: 215000,
      transmission: '8-Speed DCT',
      fuelType: 'Gasoline',
      imageUrl: 'https://images.unsplash.com/photo-1617650728468-8591f861114c?q=80&w=1000',
    },
    {
      name: 'Lucid Air Sapphire',
      year: 2024,
      price: 249000,
      transmission: 'Automatic',
      fuelType: 'Electric',
      imageUrl: 'https://images.unsplash.com/photo-1669062369400-f9f30be6289d?q=80&w=1000',
    },
    {
      name: 'Rolls-Royce Spectre',
      year: 2024,
      price: 420000,
      transmission: 'Automatic',
      fuelType: 'Electric',
      imageUrl: 'https://images.unsplash.com/photo-1695663363321-4d7a86c679a7?q=80&w=1000',
    },
    {
      name: 'McLaren Artura',
      year: 2023,
      price: 237500,
      transmission: '8-Speed SSG',
      fuelType: 'Hybrid',
      imageUrl: 'https://images.unsplash.com/photo-1627247703833-f24bc4417a42?q=80&w=1000',
    },
    {
      name: 'Jaguar F-Type R',
      year: 2024,
      price: 113000,
      transmission: 'Quickshift',
      fuelType: 'Gasoline',
      imageUrl: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1000',
    },
    {
      name: 'Bugatti Chiron',
      year: 2023,
      price: 3300000,
      transmission: '7-Speed DSG',
      fuelType: 'Gasoline',
      imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?q=80&w=1000',
    },
  ];
}
