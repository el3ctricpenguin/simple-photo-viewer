import os, json, re

imglist={} #辞書(あとでjsonに変換する)

path = './'
files = os.listdir(path)
regex = re.compile(r'(.jpg)$')
for f in files:
    if os.path.isdir(f): #ディレクトリの場合、
        ffiles = os.listdir(path+f) #その中のファイルから
        imgs = []
        for ff in ffiles:
            if regex.search(ff): #正規表現によって.jpgのみ抽出
                imgs.append(ff)
        imglist[f] = sorted(imgs) #sortedでファイルを並べる
imglist = sorted(imglist.items()) #.itemsで辞書のkeyだけでなく中のオブジェクトも出力
#ファイルに書き出し
with open('./img_list.json', 'w') as f:
    json.dump(imglist, f, indent='\t')
print(imglist)
