#! /bin/bash
USER="root"
PASSWORD='joplus@2018'

echo '1:后台项目'
# echo '2:www.joplus.cn'
echo '3 im 环信后台 项目 文件夹im'
echo '4 即时通讯IM环信端'

echo -n '请选择需要上传的项目序号:'
read server

path=""

# if [ $server = 1 ];then
# path="jo"
# fi

if [ $server = 1 ];then
path="jo"
echo $path
fi


if [ $server = 3 ];then
path="im"
echo $path
fi

if [ $server = 4 ];then
path="hxim"
echo $path
fi


cd dist

lftp -u $USER,$PASSWORD sftp://139.196.190.241/app/tomcat_test/webapps/$path <<EOF
mput *
ls
quit
EOF