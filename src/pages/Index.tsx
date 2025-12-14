import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
  commentsList?: Comment[];
}

interface Message {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState('');
  const [showComments, setShowComments] = useState<{[key: number]: boolean}>({});
  const [newComment, setNewComment] = useState<{[key: number]: string}>({});

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Анна Петрова',
      avatar: '👩‍💼',
      content: 'Только что запустили новый проект! Команда работала невероятно слаженно. Спасибо всем за поддержку! 🚀',
      likes: 42,
      comments: 8,
      timestamp: '2 часа назад',
      liked: false,
      commentsList: [
        { id: 1, author: 'Иван Сидоров', avatar: '👨', content: 'Поздравляю! Отличная работа!', timestamp: '1 час назад' },
        { id: 2, author: 'Мария Иванова', avatar: '👩', content: 'Супер! Жду результатов 🎉', timestamp: '30 мин назад' },
      ],
    },
    {
      id: 2,
      author: 'Дмитрий Козлов',
      avatar: '👨‍💻',
      content: 'Делюсь находкой: новая библиотека для работы с анимациями. Производительность выросла на 60%!',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      likes: 87,
      comments: 15,
      timestamp: '5 часов назад',
      liked: true,
      commentsList: [
        { id: 1, author: 'Петр Васильев', avatar: '👨‍💼', content: 'Какая библиотека? Поделись ссылкой!', timestamp: '4 часа назад' },
        { id: 2, author: 'Ольга Морозова', avatar: '👩‍💻', content: 'Тоже хочу попробовать!', timestamp: '3 часа назад' },
        { id: 3, author: 'Сергей Кузнецов', avatar: '👨‍🎨', content: 'Отличная находка, спасибо за инфо', timestamp: '2 часа назад' },
      ],
    },
    {
      id: 3,
      author: 'Елена Смирнова',
      avatar: '👩‍🎨',
      content: 'Закончила редизайн главной страницы. Что думаете о новой цветовой палитре?',
      likes: 124,
      comments: 23,
      timestamp: '1 день назад',
      liked: false,
      commentsList: [
        { id: 1, author: 'Анна Петрова', avatar: '👩‍💼', content: 'Очень стильно! 💜', timestamp: '20 часов назад' },
        { id: 2, author: 'Дмитрий Козлов', avatar: '👨‍💻', content: 'Яркие цвета — это круто!', timestamp: '18 часов назад' },
      ],
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, name: 'Команда дизайна', avatar: '🎨', lastMessage: 'Отправили новые макеты', time: '10:30', unread: 3 },
    { id: 2, name: 'Иван Иванов', avatar: '👨‍💼', lastMessage: 'Когда встречаемся?', time: '09:15', unread: 1 },
    { id: 3, name: 'Проект Альфа', avatar: '🚀', lastMessage: 'Обновление статуса', time: 'Вчера', unread: 0 },
    { id: 4, name: 'Мария Кузнецова', avatar: '👩', lastMessage: 'Спасибо за помощь!', time: 'Вчера', unread: 0 },
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleNewPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        author: 'Вы',
        avatar: '😊',
        content: newPost,
        likes: 0,
        comments: 0,
        timestamp: 'Только что',
        liked: false,
        commentsList: [],
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const toggleComments = (postId: number) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId: number) => {
    const commentText = newComment[postId]?.trim();
    if (commentText) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newCommentObj: Comment = {
            id: (post.commentsList?.length || 0) + 1,
            author: 'Вы',
            avatar: '😊',
            content: commentText,
            timestamp: 'Только что',
          };
          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [...(post.commentsList || []), newCommentObj],
          };
        }
        return post;
      }));
      setNewComment(prev => ({ ...prev, [postId]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/30">
      <header className="sticky top-0 z-50 glass border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-xl">
                М+
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                мир+
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/60 border-primary/20 focus:border-primary/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full text-xs text-white flex items-center justify-center font-semibold">
                  5
                </span>
              </Button>
              <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                <AvatarFallback className="gradient-primary text-white">😊</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass w-full max-w-md mx-auto grid grid-cols-5 p-1">
            <TabsTrigger value="feed" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              <Icon name="Home" size={18} />
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              <Icon name="Search" size={18} />
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:gradient-primary data-[state=active]:text-white relative">
              <Icon name="MessageCircle" size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full text-[10px] text-white flex items-center justify-center font-semibold">
                4
              </span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              <Icon name="User" size={18} />
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:gradient-primary data-[state=active]:text-white">
              <Icon name="Settings" size={18} />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6 animate-fade-in">
            <Card className="glass border-primary/20">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback className="gradient-primary text-white">😊</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      placeholder="Что нового?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="resize-none bg-background/60 border-primary/20 focus:border-primary/50"
                      rows={3}
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-primary">
                          <Icon name="Image" size={18} className="mr-2" />
                          Фото
                        </Button>
                        <Button variant="ghost" size="sm" className="text-accent">
                          <Icon name="Smile" size={18} className="mr-2" />
                          Эмодзи
                        </Button>
                      </div>
                      <Button 
                        onClick={handleNewPost}
                        disabled={!newPost.trim()}
                        className="gradient-primary hover:opacity-90"
                      >
                        Опубликовать
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {posts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="glass border-primary/10 hover:border-primary/30 transition-all animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl">
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Icon name="MoreHorizontal" size={18} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/90">{post.content}</p>
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full rounded-xl object-cover max-h-96"
                      />
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={post.liked ? 'text-secondary' : ''}
                        >
                          <Icon name={post.liked ? "Heart" : "Heart"} size={18} className={post.liked ? 'fill-current' : ''} />
                          <span className="ml-2 font-semibold">{post.likes}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleComments(post.id)}
                        >
                          <Icon name="MessageCircle" size={18} />
                          <span className="ml-2">{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Share2" size={18} />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Icon name="Bookmark" size={18} />
                      </Button>
                    </div>

                    {showComments[post.id] && (
                      <div className="mt-4 space-y-4 animate-fade-in">
                        <Separator />
                        <div className="space-y-3">
                          {post.commentsList && post.commentsList.length > 0 ? (
                            post.commentsList.map((comment) => (
                              <div key={comment.id} className="flex gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-lg">
                                    {comment.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold text-sm">{comment.author}</p>
                                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">Пока нет комментариев. Будьте первым!</p>
                          )}
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="gradient-primary text-white text-sm">😊</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex gap-2">
                            <Input
                              placeholder="Добавить комментарий..."
                              value={newComment[post.id] || ''}
                              onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAddComment(post.id);
                                }
                              }}
                              className="bg-background/60 border-primary/20 focus:border-primary/50"
                            />
                            <Button
                              size="icon"
                              onClick={() => handleAddComment(post.id)}
                              disabled={!newComment[post.id]?.trim()}
                              className="gradient-primary hover:opacity-90"
                            >
                              <Icon name="Send" size={18} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="search" className="animate-fade-in">
            <Card className="glass border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name="Search" className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold">Поиск</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Найти людей, сообщества, контент..."
                  className="bg-background/60 border-primary/20 focus:border-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">Популярные темы</p>
                  <div className="flex flex-wrap gap-2">
                    {['#технологии', '#дизайн', '#разработка', '#искусство', '#путешествия', '#фотография'].map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-primary hover:text-white transition-colors px-4 py-2 text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">Рекомендуемые пользователи</p>
                  {[
                    { name: 'Александр Новиков', role: 'UX/UI Дизайнер', avatar: '👨‍🎨' },
                    { name: 'Ольга Волкова', role: 'Frontend разработчик', avatar: '👩‍💻' },
                    { name: 'Сергей Морозов', role: 'Product Manager', avatar: '👨‍💼' },
                  ].map((user) => (
                    <div key={user.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.role}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gradient-primary text-white border-0 hover:opacity-90">
                        Подписаться
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="animate-fade-in">
            <Card className="glass border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="MessageCircle" className="text-primary" size={24} />
                    <h2 className="text-2xl font-bold">Сообщения</h2>
                  </div>
                  <Button size="icon" className="gradient-primary">
                    <Icon name="Edit" size={18} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-1">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="relative">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl">
                                {message.avatar}
                              </AvatarFallback>
                            </Avatar>
                            {message.unread > 0 && (
                              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full text-xs text-white flex items-center justify-center font-semibold">
                                {message.unread}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold truncate">{message.name}</p>
                              <p className="text-xs text-muted-foreground">{message.time}</p>
                            </div>
                            <p className={`text-sm truncate ${message.unread > 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                              {message.lastMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card className="glass border-primary/20">
              <div className="relative h-32 gradient-primary rounded-t-xl" />
              <CardContent className="space-y-6 -mt-16 relative">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                  <Avatar className="w-32 h-32 ring-4 ring-background">
                    <AvatarFallback className="bg-gradient-to-br from-accent to-primary text-5xl text-white">
                      😊
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <h2 className="text-3xl font-bold">Ваше имя</h2>
                    <p className="text-muted-foreground">@username</p>
                    <p className="max-w-md">Рассказываю о технологиях, делюсь опытом и создаю полезный контент 🚀</p>
                  </div>
                  <Button className="gradient-primary">
                    Редактировать профиль
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 py-6">
                  <div className="text-center space-y-1">
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      248
                    </p>
                    <p className="text-sm text-muted-foreground">Публикаций</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                      1.2k
                    </p>
                    <p className="text-sm text-muted-foreground">Подписчиков</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      342
                    </p>
                    <p className="text-sm text-muted-foreground">Подписок</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Интересы</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Дизайн', 'Разработка', 'Искусство', 'Технологии', 'Путешествия'].map((interest) => (
                      <Badge key={interest} variant="secondary" className="px-4 py-2">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <Card className="glass border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name="Settings" className="text-primary" size={24} />
                  <h2 className="text-2xl font-bold">Настройки</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="User" className="text-primary" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold">Аккаунт</p>
                        <p className="text-sm text-muted-foreground">Управление профилем</p>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-muted-foreground" size={18} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Icon name="Lock" className="text-secondary" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold">Приватность</p>
                        <p className="text-sm text-muted-foreground">Кто может видеть контент</p>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-muted-foreground" size={18} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon name="Shield" className="text-accent" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold">Безопасность</p>
                        <p className="text-sm text-muted-foreground">Пароль и двухфакторная аутентификация</p>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-muted-foreground" size={18} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Bell" className="text-primary" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold">Уведомления</p>
                        <p className="text-sm text-muted-foreground">Настройка оповещений</p>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-muted-foreground" size={18} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Icon name="Users" className="text-secondary" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold">Сообщество</p>
                        <p className="text-sm text-muted-foreground">Правила и модерация</p>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-muted-foreground" size={18} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-destructive/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Icon name="LogOut" className="text-destructive" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-destructive">Выйти</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;