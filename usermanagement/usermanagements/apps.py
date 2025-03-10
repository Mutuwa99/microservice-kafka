from django.apps import AppConfig



class UsermanagementsConfig(AppConfig):
    name = 'usermanagements'


    def ready(self):
        import usermanagements.signals  # 🔥 Import signals here