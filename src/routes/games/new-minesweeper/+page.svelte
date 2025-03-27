<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowDownFromLine, ArrowRightFromLine, Bomb } from 'lucide-svelte';

	let gameTick = $state(1);
	let startTime = new Date();
	let currTime = $state(0);

	let filled = $state(false);

	let board: {
		state: any,
		bombs: number,
		x: number,
		y: number
	} = $state({
		state: {},
		bombs: 10,
		x: 10,
		y: 10
	});

	function gameUpdate(e: any) {
		// console.log({ e, x });
		gameTick += 1;
	}

	function secondUpdate(e: any) {
		console.log({ currTime });
		const currDate = new Date();
		currTime = Math.floor((currDate.getTime() - startTime.getTime()) / 1000);
	}

	onMount(() => {
		const screen_update = new Worker('/games/frame_timer.js');
		screen_update.onmessage = (e) => {
			gameUpdate(e);
		};

		const second_update = new Worker('/games/second_timer.js');
		second_update.onmessage = (e) => {
			secondUpdate(e);
		};

		return () => {
			screen_update.terminate();
			second_update.terminate();
		};
	});

	function createBoard() {
		const newBoardState = Array.from({ length: board.y }, () =>
			Array.from({ length: board.x }, () => (
				{ isOpened: false, bomb: false }
			))
		);

		let bombArr = new Array(board.y * board.x);
		for (let i = 0; i < board.x; i++) {
			for (let j = 0; j < board.y; j++) {
				bombArr[j * board.x + i] = [i, j];
			}
		}

		for (let i = 0; i < board.bombs; i++) {
			const chosenIdx = Math.floor(Math.random() * bombArr.length);
			const chosen = bombArr[chosenIdx];
			const [x,y] = chosen;
			bombArr.splice(chosenIdx, 1);
			newBoardState[y][x].bomb = true;
			console.log([x,y])
		}

		// Update the state
		board.state = newBoardState;
	}

	function startGame() {
		createBoard();

		filled = true;
		startTime = new Date();
		currTime = 0;
	}

	function reveal(x: number, y: number) {
		return function() {
			board.state[y][x].isOpened = true;
			console.log(x, y);
		};
	}


</script>

<div>
	<div class="flex w-full justify-between">
		<div>Board {gameTick} {currTime}</div>
		<button onclick={()=>{filled = false}}
						class="
              flex gap-2 justify-center
               rounded-lg py-1 px-3 hover:shadow
               bg-transparent
               dark:hover:text-slate-700 dark:hover:bg-slate-300 dark:text-white dark:border-white
               hover:bg-slate-800 hover:text-slate-300 text-black border border-black
               transition"
		>
			Back
		</button>
	</div>

	<div class="grid h-screen">
		<!-- Board -->
		{#if filled}
			<div class="bg-white m-4 place-self-center">
				{#each board.state as rowArr,y}
					<div class="flex">
						{#each rowArr as cell,x}
							{#if cell.isOpened}
								{#if cell.bomb}
									<button class="
							w-8 h-8 m-1 rounded
							bg-gray-900
							" onclick={reveal(x,y)} aria-label="cell">
									</button>
								{:else}
									<button class="
							w-8 h-8 m-1 rounded
							bg-gray-700
							" onclick={reveal(x,y)} aria-label="cell">
									</button>
								{/if}
							{:else}
								<button class="
							w-8 h-8 m-1 rounded
							bg-gray-500
							" onclick={reveal(x,y)} aria-label="cell">
								</button>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{:else}
			<!-- Main Menu -->
			<div class="place-self-center flex flex-col gap-2">
				<div class="flex justify-center mb-4">
					<Bomb />
					<h2 class="font-bold text-3xl">Minesweeper</h2>
				</div>

				<div class="flex flex-col items-end">
					<div class="flex items-center gap-2 text-gray-500">
						<ArrowRightFromLine />
						<input type="number"
									 placeholder="Height"
									 class="rounded bg-gray-900  w-64 p-2"
									 bind:value={board.x}
						>
					</div>
					<div class="flex items-center gap-2 text-gray-500">
						<ArrowDownFromLine />
						<input type="number"
									 placeholder="Height"
									 class="rounded bg-gray-900  w-64 p-2"
									 bind:value={board.y}
						>
					</div>
					<div class="flex items-center gap-2 text-gray-500">
						<Bomb />
						<input type="number"
									 placeholder="Height"
									 class="rounded bg-gray-900  w-64 p-2"
									 bind:value={board.bombs}
						>
					</div>
				</div>
				<div class="border-b my-4"></div>
				<button onclick={startGame}
								class="
              flex gap-2 justify-center
               rounded-lg py-1 px-3 hover:shadow
               bg-transparent
               dark:hover:text-slate-700 dark:hover:bg-slate-300 dark:text-white dark:border-white
               hover:bg-slate-800 hover:text-slate-300 text-black border border-black
               transition"
				>
					Start
				</button>
			</div>
		{/if}

	</div>

</div>