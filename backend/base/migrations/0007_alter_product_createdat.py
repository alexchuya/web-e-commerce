# Generated by Django 5.0.4 on 2024-04-17 06:32

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_alter_order_createat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='createdAt',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]