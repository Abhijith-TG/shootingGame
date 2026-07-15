    const player = document.getElementById("player");
    const playground = document.getElementById("playground");
    const marks = document.getElementById("mark");
    const a_key = document.getElementById("a_key")
    const d_key = document.getElementById("d_key")
    const w_key = document.getElementById("w_key")
    const high = document.getElementById("high");



    let position = player.getBoundingClientRect();
    let i = 485.475;

    let j = position.left;
    let mark = 0;
    let markDashs = 0;
    let LeftMove = false
    let rightMove = false
    const SPEED = 4;
    let highScore = localStorage.getItem('highscore')





    const moveUp = () => {
        i = i - 20;
        player.style.top = `${i}px`;
    };

    const moveDown = () => {
        i = i + 20;
        player.style.top = `${i}px`;
    };

    const moverLeft = () => {
        j = j - SPEED;
        player.style.left = `${j}px`;
    };

    const moverRight = () => {
        j = j + SPEED;
        player.style.left = `${j}px`;
    };
    const enemy = document.getElementById('enemy');
    const resetPositionOfEnemy = () => {
        enemy.style.left = Math.floor(Math.random() * 400) + 'px';
        // enemy.style.b ckgroundColor = getRandomColor();

        // enemyAI()
    }


    // const enemyAI = ()=>{
    //         const playerPos = player.getBoundingClientRect;
    //         enemy.style.left = playerPos.left;
    //         enemy.style.right = playerPos.right;
    //         // ememy.style.top = playerPos.left;
    //         // ememy.left = playerPos.left;

    // }


    const EnemyShoot = () => {
        let bombs = document.createElement("div");
        bombs.className = 'bombs';
        playground.appendChild(bombs)

        if (enemy) {

            const enemyPos = enemy.getBoundingClientRect();



            let bombsY = enemyPos.top + 15;
            let bombsX = enemyPos.left + 10;



            bombs.style.position = 'absolute';

            bombs.style.top = `${bombsY}px`;
            bombs.style.left = `${bombsX}px`;



            const moveBullet = () => {
                bombsY += 5;
                bombs.style.top = `${bombsY}px`;





                const bulletPos = bombs.getBoundingClientRect();
                if (player) {
                    const playerPos = player.getBoundingClientRect();

                    if (
                        bulletPos.top <= playerPos.bottom &&
                        bulletPos.bottom >= playerPos.top &&
                        bulletPos.left <= playerPos.right &&
                        bulletPos.right >= playerPos.left
                    ) {
                        markDashs = mark;

                        ResetPlayer();
                        bombs.remove();
                        return;
                    }
                }

                if (bombsY > 500) {
                    bombs.remove();
                    return;
                }

                requestAnimationFrame(moveBullet);
            };

            requestAnimationFrame(moveBullet);
        }
        setTimeout(()=>{

        },1000)

    }





    const ResetPlayer = () => {
        let highBool = false;
        if(mark>highScore){
            localStorage.setItem('highscore',mark)
            highBool = true;
            
        }
        highScore = localStorage.getItem('highscore')
        const marksDash = document.querySelector('#marks');
        marksDash.innerHTML = highBool ? `Highest Score: ${mark}` :mark;
        high.innerHTML = `Past High Score: ${highScore} `
        const over = document.querySelector(".over");
        over.style.display = "flex";

    }

    const markPlus = () => {
        mark++;
        marks.innerHTML = mark;
    }

    const Shoot = () => {
        let bullet = document.createElement("div");
        bullet.className = 'bullet';
        playground.appendChild(bullet);

        let bulletY = i - 20;
        let bulletX = j + 16;



        bullet.style.position = 'absolute';

        bullet.style.top = `${bulletY}px`;
        bullet.style.left = `${bulletX}px`;


        const moveBullet = () => {
            bulletY -= 5;
            bullet.style.top = `${bulletY}px`;



            const bulletPos = bullet.getBoundingClientRect();
            if (enemy) {
                const enemyPos = enemy.getBoundingClientRect();

                if (
                    bulletPos.top <= enemyPos.bottom &&
                    bulletPos.bottom >= enemyPos.top &&
                    bulletPos.left <= enemyPos.right &&
                    bulletPos.right >= enemyPos.left
                ) {
                    resetPositionOfEnemy()
                    markPlus();
                    bullet.remove();
                    return;
                }
            }

            if (bulletY < 0) {
                bullet.remove();
                return;
            }

            requestAnimationFrame(moveBullet);
        };

        requestAnimationFrame(moveBullet);
    };

    player.focus();

  



    player.addEventListener('keydown',(e)=>{
        if (e.key === 'a'){
            LeftMove = true
        }
        if (e.key === 'd'){
            rightMove = true
        }
    })
    player.addEventListener('keyup',(e)=>{
        if (e.key === 'a'){
            LeftMove = false
        }
        if (e.key === 'd'){
            rightMove = false
        }
    })


    player.addEventListener('keypress',(e)=>{
        if(e.key=== ' '){
            Shoot()
        }
    })

    w_key.onclick=()=>{
        Shoot()
    }

    a_key.addEventListener('touchstart',()=>{
        LeftMove = true
        
    })
    a_key.addEventListener('touchend',()=>{
        LeftMove = false

    })

    d_key.addEventListener('touchstart',()=>{
        rightMove = true
        
    })
    d_key.addEventListener('touchend',()=>{
        rightMove = false

    })





    d_key.addEventListener('touchstart',moverRight)


    setInterval(() => {
        EnemyShoot()

    }, 1200)


    function gameLoop(){

        if(LeftMove){
            moverLeft()
        }
        if(rightMove){
            moverRight()
        }

        requestAnimationFrame(gameLoop)
    }

    gameLoop()









