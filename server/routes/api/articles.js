const mongoose = require('mongoose');
const router = require('express').Router();
const Article = mongoose.model('Article');

router.post('/', (req, res, next) => {
  const { body } = req;
  console.log(body)
  if(!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body.author) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body.body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }

  if(!body.keyword) {
    return res.status(422).json({
      errors: {
        keyword: 'is required',
      },
    });
  }

  const finalArticle = new Article(body);
  return finalArticle.save()
    .then(() => res.json({ article: finalArticle.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Article.find()
    .sort({ createdAt: 'descending' })
    .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Article.findById(id, (err, article) => {
    if(err) {
      return res.sendStatus(404);
    } else if(article) {
      req.article = article;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    article: req.article.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.title !== 'undefined') {
    req.article.title = body.title;
  }

  if(typeof body.author !== 'undefined') {
    req.article.author = body.author;
  }

  if(typeof body.body !== 'undefined') {
    req.article.body = body.body;
  }

  if(typeof body.keyword !== 'undefined') {
    req.article.keyword = body.keyword;
  }

  return req.article.save()
    .then(() => res.json({ article: req.article.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Article.findByIdAndRemove(req.article._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;