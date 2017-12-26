import os
from django.core.management import BaseCommand

from monitoring.constants import SAMPLE_DATA_PATH
from monitoring.loaders.tyre_csv_loader import TyreCsvLoader
from monitoring.models import TyreMeasurement


class Command(BaseCommand):
    help = 'Load sample data into DB'

    def add_arguments(self, parser):
        parser.add_argument(
            '--csv_path',
            dest='csv_path',
            help='Path of the csv file to load.',
        )

    def handle(self, csv_path, *args, **options):
        if csv_path is None:
            csv_path = SAMPLE_DATA_PATH

        if not TyreMeasurement.objects.all().exists():
            if not os.path.isfile(csv_path):
                print('*WARNING:* "{}" file not found.\n'.format(csv_path),
                      'Skipping import of sample data.')
            print('Populating DB with sample data...')
            TyreCsvLoader(file_path=csv_path, show_progress=True).load_into_db()
