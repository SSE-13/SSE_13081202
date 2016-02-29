#自我介绍

![icon](http://imgsrc.baidu.com/forum/pic/item/ff7ee050352ac65c1e9ad261fff2b21192138a7a.jpg)

##资本资料
* 姓名：**李莫伊**
* 学号：**13081202**
* 邮箱：823779508@qq.com
* qq：823779508

##关于我：
* 喜欢玩游戏，范围覆盖掌机，主机，PC的各种游戏。最近一直在玩[**怪物猎人X**](http://www.capcom.co.jp/monsterhunter/)，感觉虽然画面呵呵，游戏性加特效还是不错的！
* 平时一般会关注游戏方面的新闻，攒钱准备买主机中！！
* 毕业后准备去美国留学学习游戏制作，希望老师在成绩上照顾一下，谢谢！

##代码片段
    #include <stdio.h>
    #define NUM 35
    main()
    {
    	float s[NUM]={0};
	    int i=0,j,min;
	    float a,b,c,d,temp,ava;
	    printf("Please enter %d students' grade:\n",NUM);
	    for(i=0;i<NUM;i++){
	    	scanf("%f%f%f%f",&a,&b,&c,&d);
	    	ava=(a+b+c+d)/4;
	    	s[i]=ava;
    	}
    	for(i=0;i<NUM-1;i++){
	      min=i;
	    for(j=i+1;j<NUM;j++){
		    if(s[j]<s[min])
		      min=j;
		    }
		    if(min!=i){
		    	temp=s[i];
		    	s[i]=s[min];
		    	s[min]=temp;
	    	}
    	}
    	printf("\nOrdering list is:\n");
    	for(i=0;i<NUM;i++)
	    printf("%f\n",s[i]);
    }

