# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-04-15 19:40
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=32, unique=True, validators=[django.core.validators.MaxLengthValidator(32, message='Ingredient name must contain at                                most 32 characters'), django.core.validators.MinLengthValidator(2, message='Ingredient name must contain at                                least 2 characters')])),
            ],
            options={
                'db_table': 'ingredients',
            },
        ),
        migrations.CreateModel(
            name='Nutrient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('proteins', models.DecimalField(decimal_places=2, default=0.0, max_digits=6, validators=[django.core.validators.MaxValueValidator(1000), django.core.validators.MinValueValidator(0)])),
                ('carbohydrates', models.DecimalField(decimal_places=2, default=0.0, max_digits=6, validators=[django.core.validators.MaxValueValidator(1000), django.core.validators.MinValueValidator(0)])),
                ('fats', models.DecimalField(decimal_places=2, default=0.0, max_digits=6, validators=[django.core.validators.MaxValueValidator(1000), django.core.validators.MinValueValidator(0)])),
                ('fibers', models.DecimalField(decimal_places=2, default=0.0, max_digits=6, validators=[django.core.validators.MaxValueValidator(1000), django.core.validators.MinValueValidator(0)])),
                ('kcals', models.DecimalField(decimal_places=2, default=0.0, max_digits=7, validators=[django.core.validators.MaxValueValidator(10000), django.core.validators.MinValueValidator(0)])),
            ],
            options={
                'db_table': 'nutrients',
            },
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=32, validators=[django.core.validators.MaxLengthValidator(32, message='Food name must contain at                                most 32 characters'), django.core.validators.MinLengthValidator(2, message='Ingredient name must contain at                                least 2 characters')])),
                ('ingredients', models.ManyToManyField(db_table='food_ingredients', related_name='recipes', to='app.Ingredient')),
                ('nutrients', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='app.Nutrient')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='ingredient',
            name='nutrient',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ingredient', to='app.Nutrient'),
        ),
    ]
