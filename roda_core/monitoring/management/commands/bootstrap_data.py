from django.core.management import BaseCommand

from monitoring.constants import SAMPLE_DATA_PATH
from monitoring.loaders.tyre_csv_loader import TyreCsvLoader
from monitoring.models import TyreMeasurement


class BootstrapData(BaseCommand):
    help = 'Load sample data into DB'

    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('poll_id', nargs='+', type=int)

        # Named (optional) arguments
        parser.add_argument(
            '--csv_path',
            dest='csv_path',
            help='Path of the csv file to load.',
        )

    def handle(self, csv_path=SAMPLE_DATA_PATH, *args, **options):
        if not TyreMeasurement.objects.all().exists():
            print('Populating DB with sample data...')
            TyreCsvLoader(file_path=csv_path).load_into_db()
