# Generated by Django 5.0.4 on 2024-04-17 06:31

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_order_isdelivered'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='createAt',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
