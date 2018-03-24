# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-24 21:17
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
                ('name', models.CharField(max_length=30, validators=[django.core.validators.MaxLengthValidator(30, message='Ingredient name must contain at                                    most 30 characters'), django.core.validators.MinLengthValidator(2, message='Ingredient name must contain at                                    least 2 characters')])),
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
            ],
            options={
                'db_table': 'nutrients',
            },
        ),
        migrations.AddField(
            model_name='ingredient',
            name='nutrient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='comments', to='app.Nutrient'),
        ),
    ]