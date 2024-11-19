404 pages get removed, Ok? Im reminding you because I got this in space_status.json:

  "https://fdkasjl-fadshj.hf.space/": {
    "status": true,
    "timestamp": 1731927932125
  }

So 404 should be removed and the errored spaces should have a visible label that says "Not working" so the user knows that if they click on it it probably wont work. This is the example json I want as a result:

  "https://working-space.hf.space": {
    "status": "is-working",
    "timestamp": 1731927657253
  },
  "https://not-working.hf.space/": {
    "working": "non-working",
    "timestamp": 1731927657253
  },
  "https://Madeup-404.hf.space/": {
    "status": "404",
    "timestamp": 1731927932125
  }
  
  
Also, When re-deploying/re-building, it should remove all traces of previous deployment/build


You would need to modify the JS files to do these things because the JS files are the ones that generate the space_status.json file.

Here is the code of the body of the page for each mistake and what to do with it:


Remove the sites with this code from all_links.json when building to deploy.
```html
<body>
<main>
    <img src="https://huggingface.co/front/assets/huggingface_logo.svg" alt="">
    <div>
        <h1>404</h1>
        <p>Sorry, we can’t find the page you are looking for.</p>
    </div>
</main>


</body>
```


Temporary label for spaces in error over the button for the space.
```html
<body>Your space is in error, check its status on hf.co</body>
```

