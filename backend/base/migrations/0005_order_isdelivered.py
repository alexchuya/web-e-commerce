# Generated by Django 5.0.4 on 2024-04-17 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_remove_order_isdelivered'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='isDelivered',
            field=models.BooleanField(default=False),
        ),
    ]
