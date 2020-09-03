ssh-keygen -f roles/web/files/secrets/id_rsa -t rsa -N "" > /dev/null
ssh-keygen -f roles/web/files/secrets/id_rsa2 -t rsa -N "" > /dev/null
</dev/urandom tr -dc 'A-Za-z0-9!"#$%&'\''()*+,-./:;<=>?@[\]^_`{|}~' | head -c 13 > roles/web/files/secrets/server.secret
</dev/urandom tr -dc 'A-Za-z0-9!"#$%&'\''()*+,-./:;<=>?@[\]^_`{|}~' | head -c 13 > roles/web/files/secrets/front.secret
echo "Public SSH Key:"
cat roles/web/files/secrets/id_rsa.pub 
echo "Please add the key to Deploy Keys in your GitHub backend's repository then press Enter"
read useless
cat roles/web/files/secrets/id_rsa2.pub 
echo "Please add the key to Deploy Keys in your GitHub frontend's repository then press Enter"
read useless
echo -n "Please enter your MySQl user's password: "
read -s password
echo
ansible-playbook -i inventory web.yml -e "mysql_password=$password" &&
echo "Execution of the script complete." &&
echo "Server secret: $(cat roles/web/files/secrets/server.secret)" &&
echo "Front secret: $(cat roles/web/files/secrets/front.secret)"
rm roles/web/files/secrets/* -f