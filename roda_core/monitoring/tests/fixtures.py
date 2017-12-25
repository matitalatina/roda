from monitoring.loaders.tyre_csv_loader import TyreCsvLoader

TEST_CSV_PATH = 'monitoring/tests/data/test_measurements.csv'


def load_tyre_measurements():
    TyreCsvLoader(file_path=TEST_CSV_PATH).load_into_db()
