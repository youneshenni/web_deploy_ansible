cd /web/www/Models/
git reset --hard HEAD
git pull origin master
cd /web/www/html
rm -rf Models
cd /web/www
cp Models/ html/Models/ -r
cp Connexion.inc.php html/Models/
cd html
chmod g+rx -R Models