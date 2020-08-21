ssh-keygen -f roles/web/files/secrets/id_rsa -t rsa -N "" > /dev/null
</dev/urandom tr -dc 'A-Za-z0-9!"#$%&'\''()*+,-./:;<=>?@[\]^_`{|}~' | head -c 13 > roles/web/files/secrets/server.secret
</dev/urandom tr -dc 'A-Za-z0-9!"#$%&'\''()*+,-./:;<=>?@[\]^_`{|}~' | head -c 13 > roles/web/files/secrets/front.secret
echo -n "Please enter your MySQl user's password: "
read -s password
echo
ansible-playbook -i inventory web.yml -e "mysql_password=$password" &&
echo "Execution of the script complete, here's the pubic SSH key:" &&
cat roles/web/files/secrets/id_rsa.pub &&
echo "Server secret: $(cat roles/web/files/secrets/server.secret)" &&
echo "Front secret: $(cat roles/web/files/secrets/front.secret)" &&
rm roles/web/files/secrets/* -f